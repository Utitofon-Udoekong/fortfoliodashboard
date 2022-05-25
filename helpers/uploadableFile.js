class UploadableFile {
    constructor(file) {
        this.file = file
        this.name = file.name
        this.type = file.type
        this.size = file.size
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        this.url = URL.createObjectURL(file)
        this.status = null
    }
}
export default UploadableFile