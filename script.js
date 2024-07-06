//Dom yapısı oluşturuldu 
document.addEventListener("DOMContentLoaded", () => {
    //Değişken atamaları 
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

//sayfada kalıcı olmayı sağlar loadTask konusu kodun sonunda da yazılı 
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };

 //yerel depolamaya kaydeder 
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector("span").textContent,
                completed: taskItem.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

//Dom a yeni bir iş ekleme burada text gibi konuları ekledik 
    const addTaskToDOM = (text, completed = false) => {
        //Domda tarayıcıda gözükmüyor Ramde daha duran kısım 
        const taskItem = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = text;
        if (completed) taskItem.classList.add("completed");//iş tamamlandıysa eklenir 

        const completeButton = document.createElement("button");
        completeButton.textContent = "Yapıldı";
        completeButton.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
            //yapıldıysa üstünü cizme konusunun script kısmı css de de .completed { text-decoration: line-through;} kısmıda eklenmelidir.
    

        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Sil";
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(taskText);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    };

    
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && taskInput.value.trim()) {
            addTaskToDOM(taskInput.value.trim());
            taskInput.value = "";
            saveTasks();
        }
    });

    loadTasks();
});
