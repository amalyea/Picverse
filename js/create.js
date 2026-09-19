function submitRegister(){
    const fileInput = document.getElementById("file")
    const email = document.getElementById("email").value.trim();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const tags = document.getElementById("tags").value.trim();
    const ai = document.querySelector('input[name="ai"]:checked');

    document.getElementById("file-error").innerText = "";
    document.getElementById("email-error").innerText = "";
    document.getElementById("title-error").innerText = "";
    document.getElementById("description-error").innerText = "";
    document.getElementById("tags-error").innerText = "";
    document.getElementById("ai-error").innerText = "";

    let valid = true;
    if(!fileInput.files || fileInput.files.length === 0){
        document.getElementById("file-error").innerText = "Please select a file";
        valid = false
    }
    
    if(email === ""){
        document.getElementById("email-error").innerText = "Email can't be empty";
        valid = false;
    } else if(!email.endsWith("@gmail.com")){
        document.getElementById("email-error").innerText = "Email must end with @gmail.com";
        valid = false;
    }

    if(title === ""){
        document.getElementById("title-error").innerText = "Title can't be empty";
        valid = false;
    }

    if(description === ""){
        document.getElementById("description-error").innerText = "Description can't be empty";
        valid = false;
    }

    if(!ai){
        document.getElementById("ai-error").innerText = "Please choose one";
        valid = false;
    }

    if(valid){
        alert("Publish successful");
        document.getElementById("upload-form").submit();
    }
}

function resetForm(){
    document.getElementById("upload-form").reset();
    document.getElementById("email-error").innerText = "";
    document.getElementById("title-error").innerText = "";
    document.getElementById("description-error").innerText = "";
    document.getElementById("file-error").innerText = "";
    document.getElementById("ai-error").innerText = "";
}

function showSideBar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSideBar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}
