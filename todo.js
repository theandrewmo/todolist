const submitBtn = document.getElementById('submit');
const newTodo = document.getElementById('todo');
const ul = document.getElementById('todoList');
const storedTodos = JSON.parse(localStorage.getItem('todos')) || []

document.addEventListener('DOMContentLoaded', function() {
    for(let item of storedTodos) {
            const key = Object.keys(item)[0]
            const newEl = document.createElement('li')
            newEl.innerHTML = item[key]
            // console.log(item)
            item.isCrossed ? newEl.classList.add('crossed') : null
            ul.append(newEl);
    }
})

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const todoItem = document.createElement('li')
    todoItem.innerText = newTodo.value
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove item'
    todoItem.append(removeBtn)
    ul.append(todoItem)
    const taskName = todoItem.childNodes[0].data
    storedTodos.push({[taskName]: todoItem.innerHTML, isCrossed: false})
    localStorage.setItem('todos', JSON.stringify(storedTodos))
})

ul.addEventListener('click', function(e) {
    if(e.target.tagName == 'LI') {
        e.target.classList.toggle('crossed')
        storedTodos.forEach(element => {
            if(Object.keys(element)[0] == e.target.childNodes[0].data) {
             const ind = storedTodos.indexOf(element)
             storedTodos[ind].isCrossed = !storedTodos[ind].isCrossed
            }
         });
    }
    else if(e.target.tagName == 'BUTTON') {
        e.target.parentNode.remove();
        storedTodos.forEach(element => {
           if(Object.keys(element)[0] == e.target.parentNode.childNodes[0].data) {
            const ind = storedTodos.indexOf(element)
            storedTodos.splice(ind,1)
           }
        });
    } 
    
    localStorage.setItem('todos', JSON.stringify(storedTodos))

})





