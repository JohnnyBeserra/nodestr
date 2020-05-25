'use strict'

const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage');
const config = require('../config');
const guid = require('guid');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao consultar o estoque!',
            data: e
        });
    }
}
exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao consultar o estoque!',
            data: e
        });
    }
}
exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao consultar o estoque!',
        });
    }
}
exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag)
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao consultar o estoque!',
        });
    }
}
exports.post = async (req, res, next) => {
    let contract = new validationContract();

    contract.hasMinLen(req.body.title, 3, "O titulo deve conter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.description, 3, "A descrição deve conter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.slug, 3, "o slug deve conter pelo menos 3 caracteres");

    //se os contratos forem validos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        //Cria blob service
        const blobSvc = azure.createBlobService(config.containerConnectionString);
        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                filename = 'default-product.png'
            }
        })

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://nodestrs.blob.core.windows.net/product-images/' + filename,

        });
        res.status(201).send({
            message: 'Produto Cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao consultar o estoque!',
        });
    }
}
exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(201).send({
            message: 'Atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao consultar o estoque!',
            data: e
        });
    }
}
exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(201).send({
            message: 'Deletado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao deletar!',
        });
    }
}