// importaciones
var express=require('express');

var mongoose=require('mongoose');

var Proveedor=require('../model/proveedor');

var app=express();
// metodo get
app.get('/', (req,res,next)=>{
Proveedor.find({}).exec((err,datos)=>{
    if(err){
        return res.status(400).json({
            ok:false,
            mensaje:'Error de conexión',
            errores:err
        })
    }

    res.status(200).json({
        ok:true,
        proveedores: datos
        })
     
    })
});

// metodo post
app.post('/', (req,res)=>{

    var body = req.body;

    var proveedor = new Proveedor({
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto
    });
    proveedor.save((err, datos)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear proveedor',
                errores:err
            })
        }
                    res.status(201).json({
                     ok:true,
                     mensaje:'Proveedor creado',
                     proveedor:datos
        })
    })
});
// metodo put

app.put('/:id', function(req,res,next){

    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err,datos){
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'error al actualizar el proveedor',
                errores:err
            })
        }
        res.status(200).json({
            ok:true,
            mensaje:'el proveedor ' + datos.nombre + ' se he actualizado correctamente'
        })
    });
})

app.delete('/:id', function(req,res,next){

    Proveedor.findByIdAndRemove(req.params.id, function(err,datos){
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'error al eliminar el proveedor',
                errores:err
            })
        }
        res.status(200).json({
            ok:true,
            mensaje:'el proveedor ' + datos.nombre + ' se he eliminado correctamente'
        })
    });
})


module.exports = app;