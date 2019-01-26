import './css/aa.css'
import './css/bb.css'
import './css/cc.less'

document.getElementById("title").innerHTML = "hello,world111!";

let helloArwen = "heyyyy";

for (var i = 1; i <= 5; i++) {

    (function(i){
        setTimeout(function timer() {
  
            console.log(i);
      
        }, 1000 );
    })(i)
  
}