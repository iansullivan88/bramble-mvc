module.exports = [{
    path: "blog/:pageNumber",
    defaults: {
        controller:"blog",
        action:"page",
        pageNumber:0
    }
},
{
    path: ":controller/:action/:id",
    defaults: {
        controller:"home",
        action:"index",
        id:null
    }
}];