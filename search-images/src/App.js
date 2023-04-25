import { Formik, Form, Field } from "formik";
import './helpers/header.css'
import './helpers/content.css'
import './helpers/article.css'
import { useState } from "react";

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url =>window.open(url)
  console.log({photos});
  return (
    <div>
      <header>
        <Formik
          initialValues={{search: ''}}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
              headers:{
                'Authorization': 'Client-ID Gk7d6-MOzYIbvayHdmiyodG8N4OZzrgghj8cS2ZNDjA'
              }
            })

            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name='search'/>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
          <article key={photo.id} onClick={() => open(photo.links.html)}>
            <img src={photo.urls.regular}/>
            <p>{[photo.description, photo.alt_description].join(' - ')}</p>
          </article>)}
        </div>
      </div>
    </div>
  )
}

export default App;
