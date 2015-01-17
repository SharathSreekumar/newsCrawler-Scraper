var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
//var newsController = require('./controllers/news');
var newsModel = require('../models/News'); // i.e. newsModel  = 'News' from mongoose.model('News',newsSchema);

mongoose.connect('mongodb://localhost:27017/news1');
mongoose.connection.on('error',function(){
    console.error('MongoDb is not connected. Check if Mongod is running.');
});

var url = 'http://www.ndtv.com';
var event;
var tex;

createNews = function(req,res){
    res.render('headline');
}

storeNewNews = function(hed,lk){    // this function is to store value using 'post' operation
    var newsH = new newsModel();
    newsH.headline = hed;
    newsH.link = lk;
    newsH.save();
}
       
exports.startNewCollection = function(req,res) {
request.get(url,function(err,resp, body) {
    if(err)
        return console.log(url+' error!');            //exiting at error...
    $ = cheerio.load(body);
    $('.topst_listing ul li').each(function(day) {
        $(this).each(function() {
            event = $(this).text();
            tex = $(this).find('a').attr('href');
            //console.log(event+' : '+tex);
            createNews;
            storeNewNews(event,tex);
        });
    });
    console.log("Success!!");
    //getAllNew;
//    res.log("Displayed..");
});
}

getAllNew = function(req,res){
    
    newsModel.find(function(err,newh){   //for .find() we don't need an object..
        if(err)
            res.send(err);
        res.json(newh);             // newh - news Headline
    });
}

exports.getAllNew1 = function(req,res){
    
    newsModel.find(function(err,newh){   //for .find() we don't need an object..
        if(err)
            res.send(err);
        res.json(newh);             // newh - news Headline
    });
}

exports.getUserByHead = function(req,res) {         // the data is searched using HeadLine
    userModel.findById(req.params.headline,function(err,news2){ 
        if(err)
            res.send(err);
        res.render('headline',{
            users : news2
        });
        res.json(news2);
    });
}