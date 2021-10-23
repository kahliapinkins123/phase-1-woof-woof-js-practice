document.addEventListener('DOMContentLoaded', ()=>{
    let dogBar = document.querySelector('#dog-bar');
    let dogInfo = document.querySelector('#dog-info');

    fetch('http://localhost:3000/pups')
    .then(resp=>resp.json())
    .then(dogs=>createDogs(dogs))

    function createDogs(dogs){
        for(const dog of dogs){
            
            let span = document.createElement('span');
            span.textContent = dog['name'];
            dogBar.appendChild(span);

            console.log(span)
            span.addEventListener('click',()=>{
                
                let img = document.createElement('img');
                let h2 = document.createElement('h2');
                let btn = document.createElement('BUTTON');

                img.src = dog['image'];
                h2.textContent = `${dog['name']}`;
                if (dog['isGoodDog'] === true){
                    btn.textContent = 'Good dog!';
                }
                else{
                    btn.textContent = 'Bad dog!'
                }  


                dogInfo.appendChild(h2);
                dogInfo.appendChild(img);
                dogInfo.appendChild(btn);
                
                btn.addEventListener('click',()=>{
                    let status = true;
                    if (btn.textContent == 'Good dog!'){
                        btn.textContent = 'Bad dog!'
                        status = false;
                    }
                    else{
                        btn.textContent = 'Good dog!'
                        status= true;
                    }

                    fetch(`http://localhost:3000/pups/${dog['id']}`,{
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({
                            'isGoodDog': status
                        })

                    })
                    
                })

            })
        }
    }





})