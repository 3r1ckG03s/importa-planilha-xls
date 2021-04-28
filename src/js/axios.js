axios ({
    method:'get',
    url:'localhost',
    data:{
        nome='',
        numero=''
    }
})
.then(functin (response){
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});