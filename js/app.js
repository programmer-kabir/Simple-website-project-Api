const apiConvert = () =>{
  const url = 'https://openapi.programming-hero.com/api/ai/tools'
  fetch(url)
  .then(res => res.json())
  .then(data => displayData(data.data.tools.slice(0, 6)))
}

// see more button 
const apiAllConvert = () =>{
  const url = 'https://openapi.programming-hero.com/api/ai/tools'
  fetch(url)
  .then(res => res.json())
  .then(data => displayData(data.data.tools.slice(0, 100)))
  togglerSpinier(true)
}

// show display Data 
const displayData = data =>{
  // console.log(data);
  const rowContainer = document.getElementById('row')
  rowContainer.innerHTML = ''
  data.forEach(element => {

      // console.log(element);
      const {id,name, features, image, published_in} = element

      const div = document.createElement('div')
      div.classList.add('col')
      div.innerHTML = `
      <div class="card p-4" >
          <img src="${image}" class="card-img-top rounded" alt="...">
          <div class="card-body">
              <h5 class="card-title fw-semibold">Features</h5>
              <ol>
                  <li>${features[0]}</li>
                  <li>${features[1]}</li>
                  <li>${features[2]}</li>
              </ol>    
          </div>
          <hr>
          <h5 class="fw-bold">${name}</h5>
          <div class="d-flex justify-content-between">
              <div class="d-flex gap-2">
                <img class="h-50" src="Image/Frame1.png">
                <p>${published_in}</p>
              </div>
              <button onclick=showSingleModal('${id}') class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="./Image/Frame.png"></button>
          </div>
      </div>
      `
      rowContainer.appendChild(div)
      togglerSpinier(false)
  });
}

// Modal open
const showSingleModal = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => showModal(data.data))
  togglerSpinier(false)
}
const showModal = (data) =>{
    // console.log(data);
    const{description, pricing, features, integrations, image_link, input_output_examples, accuracy} = data
    const container = document.getElementById('details-body')
    container.innerHTML = `
    <div class="row row-cols-1 row-cols-lg-2 justify-content-between" >
        <div class="card col p-4 ">
            <h5 class="fw-bold">${description}</h5>
            <div class="d-flex gap-2 mx-auto justify-content-center text-center mt-3">
              <div class="shadow p-3 rounded text-success"> 
                <h6>${pricing[0].price}</h6>
                <h6>${pricing[0].plan}</h6>
              </div> 
              <div class="shadow p-3 rounded text-warning-emphasis"> 
                <h6>${pricing[1].price}</h6>
                <h6>${pricing[1].plan}</h6>
              </div> 
              <div class="shadow p-3 rounded text-danger"> 
                <h6>${pricing[2].price}</h6>
                <h6>${pricing[2].plan}</h6>
              </div> 
            </div>
            <div class="d-flex gap-5 mt-3">
                <div>
                    <h5 class="fw-bold">Features</h5>
                    <ul class="text-secondary">
                        <li>${features[1].feature_name ? features[1].feature_name : "Not Found"}</li>
                        <li>${features[2].feature_name}</li>
                        <li>${features[3].feature_name}</li>
                    </ul>    
                </div>

                <div>
                    <h5 class="fw-bold">Integrations</h5>
                    <ul class="text-secondary">
                        <li>${integrations[0]}</li>
                        <li>${integrations[1]}</li>
                        <li>${integrations[2]}</li>
                    </ul> 
                </div>
            </div>
        </div>

        <div class="card p-4 text-center col">
            <button class="accuracy-btn btn btn-danger">${(accuracy.score  *100)+'% accuracy' }</button>
            <img class="rounded" src="${image_link[0]}" alt="">
            <h5 class="mt-3">${input_output_examples[0].input}<?h5>
            <p class="text-dark mt-3">${input_output_examples[0].output}</p>
        </div>
    </div>
   `
   togglerSpinier(false)
}

// loading Spinier
const togglerSpinier = isLoading =>{
  const loading = document.getElementById('loader')
  if(isLoading){
    loading.classList.remove('d-none')
  }else{
    loading.classList.add('d-none')
  }
}
apiConvert()