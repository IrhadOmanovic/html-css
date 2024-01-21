const express = require("express");
const items = require("../public/items.json");
const fs = require("fs")
const router = express.Router();
const formidable = require("formidable");

router.get('/', (req, res, next) => {
    try {
        return res.json(items);
    } catch (err) {
        console.error(`Error while getting products`, err.message);
        next(err);
    }
});

router.get('/:productID', (req, res, next) => {
    try {
        const { productID } = req.params;
        const item = items.find(item => item.id == productID)
        return res.json(item);
    } catch (err) {
        console.error(`Error while getting products`, err.message);
        next(err);
    }
});
  
router.post('/properties', (req, res, next) => {
    try {
        const form = new formidable.IncomingForm({
            allowEmptyFiles : true,
            minFileSize : 0
        })
        const currentItems = items
        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            const newVehicle = {
                imageURL : ""
            };
            if(files.picture[0].size != 0) {
                const file = files.picture[0];
                let filepath = file.filepath;
                let newpath = './public/';
                newpath += file.originalFilename;
    
                //Copy the uploaded file to a custom folder
                fs.rename(filepath, newpath, (err) => {
                    if (err) next(err);
                    return;
                });
                newVehicle.imageURL = newpath;
            }
            //Validate properties
            for (const field in fields) {
                if("address" == field && !fields[field][0]) {
                    return res.status(400).json({
                        errorCode : 1001,
                        errorMessage : "Address field is missing!"
                    })
                }
                if("category" == field && !fields[field][0]) {
                    return res.status(400).json({
                        errorCode : 1002,
                        errorMessage : "Category field is missing!"
                    })
                }
                if("title" == field && !fields[field][0]) {
                    return res.status(400).json({
                        errorCode : 1003,
                        errorMessage : "Title field is missing!"
                    })
                }
                if("price" == field && !fields[field][0]) {
                    return res.status(400).json({
                        errorCode : 1004,
                        errorMessage : "Price field is missing!"
                    })
                }
                if("description" == field && !fields[field][0]) {
                    return res.status(400).json({
                        errorCode : 1005,
                        errorMessage : "Description field is missing!"
                    })
                }
                newVehicle[`${field}`] = fields[field][0];
            }
            delete newVehicle.upload

            currentItems.push(newVehicle);
            fs.writeFile('./public/items.json', JSON.stringify(currentItems), function(err) {
                if (err) {
                    next(err)
                    return
                }
            });

            return res.json({ newVehicle, files });
        });
            
        // return res.status(201).json(items);
    } catch (err) {
        next(err)
        return
    }
});

router.post('/vehicles', (req, res, next) => {
    try {
        const form = new formidable.IncomingForm({
            allowEmptyFiles : true,
            minFileSize : 0
        })
        const currentItems = items
        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            const newVehicle = {
                imageURL : ""
            };
            if(files?.picture?.[0]?.size != 0) {
                const file = files.picture[0];
                let filepath = file.filepath;
                let newpath = './public/';
                newpath += file.originalFilename;
    
                //Copy the uploaded file to a custom folder
                fs.rename(filepath, newpath, (err) => {
                    if (err) next(err);
                    return;
                });
                newVehicle.imageURL = newpath;
            }
            //Validate properties
            for (const field in fields) {
                if("address" == field && !fields[field][0]) {
                    return res.status(400).json({
                        errorCode : 1001,
                        errorMessage : "Address field is missing!"
                    })
                }
                if("category" == field && !fields[field][0]) {
                    return res.status(400).json({
                        errorCode : 1002,
                        errorMessage : "Category field is missing!"
                    })
                }
                if("title" == field && !fields[field][0]) {
                    return res.status(400).json({
                        errorCode : 1003,
                        errorMessage : "Title field is missing!"
                    })
                }
                if("price" == field && !fields[field][0]) {
                    return res.status(400).json({
                        errorCode : 1004,
                        errorMessage : "Price field is missing!"
                    })
                }
                if("description" == field && !fields[field][0]) {
                    return res.status(400).json({
                        errorCode : 1005,
                        errorMessage : "Description field is missing!"
                    })
                }
                newVehicle[`${field}`] = fields[field][0];
            }
            delete newVehicle.upload
            newVehicle.id = currentItems.length + 1;

            currentItems.push(newVehicle);
            fs.writeFile('./public/items.json', JSON.stringify(currentItems), function(err) {
                if (err) {
                    next(err)
                    return
                }
            });

            return res.json({ newVehicle, files });
        });
            
        // return res.status(201).json(items);
    } catch (err) {
        next(err)
        return
    }
});


module.exports = router;