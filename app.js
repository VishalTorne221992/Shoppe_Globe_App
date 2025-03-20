

export function serveStatic(app, express){

    if(process.env.NODE_ENV=="production"){

        const filename = fileURLToPath(import.meta.url)
    
        const dirname = path.dirname(filename)
    
        app.use('/', express.static('dist'));
    
        console.log('directory path :',dirname)
        
        app.get("/*", (req, res) => {
            res.sendFile(resolve("dist", "index.html"))
        })
    }
}