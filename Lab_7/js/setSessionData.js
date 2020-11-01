const main = document.getElementById("main");

function getClasses(){
    
    let classId =  "courseId"; // Your code here

    if(typeof classId !== "undefined" & classId !== ""){
        
        let classURL =  " https://api.umd.io/v0/courses/" + classId; // Your code here
        
        // YOUR CODE HERE
        
    }
    else{
        main.innerHTML = "No value provided";
    }
}