const SocketModel = require('../models/socket');


exports.CleanSocket = ()=>{
    SocketModel.find({ "socket" : 1 } , function(err, deadSockets ) {
        if (err){
            console.log( err );
        }
        else{
            for( var i = 0 ; i < deadSockets.length ; i++ ){
                deadSockets[i].remove();                
            }
        }
    });
}


exports.SocketEntry = (socket) =>{
    //I found I needed to make sure I had a socket object to get proper counts consistantly
    if( socket ){
        var socketEntry = new SocketModel({ "socket" : 1 ,"date":new Date()});
        socketEntry.save( function(err ){
            if (err){
                console.log( err );
            }
            else{

            }
        });
    }
}

exports.RemoveSocket = () =>{
    SocketModel.findOne({ "socket" : 1} , function(err, deadSocket ) {
        if (err){
            console.log( err );
        }
        else{
            deadSocket.remove();
        }
    }); 
}