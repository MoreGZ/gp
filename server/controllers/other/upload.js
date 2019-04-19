const BaseController = require('../../libs/BaseController')
const path = require('path')
const fs = require('fs')

module.exports = class extends BaseController {
    async img() {
        // console.log(this.request.files.file)
        let file = this.request.files.file
        let uploadFilePath = path.resolve(__dirname, `../../statics/upload/img/${file.name}`)
        const saveFileRes = await this.saveFile(file, uploadFilePath, `/upload/img/${file.name}`)
        console.log(saveFileRes)
        this.send(...saveFileRes)
    }

    saveFile(file, uploadFilePath, staticPath) {
        return new Promise((resolve, reject) => {
            fs.readFile( file.path, (err, data) => {
                fs.writeFile(uploadFilePath, data, (err) => {
                    if( err ){
                        reject([err, false, err.message, 0])
                        this.send()
                    }else{
                        resolve([{
                            message:'File uploaded successfully', 
                            filename:file.name,
                            filePath: staticPath
                        }, true, '成功', 1])
                    }
                });
            });
        })
    }
}