import axios from 'axios';
import { FormEvent, useEffect } from 'react';
import { useState } from 'react'
import Detail from './Detail';
import { DataModel } from './models';


const Home = () => {

  const [data, setData] = useState([] as DataModel[]);
  const [isLoading, setLoading] = useState(false as boolean);
  const [error, setError] = useState('' as string);



  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await axios.get('https://61035aa679ed6800174824b1.mockapi.io/articles');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('something went wrong')
      }

    }, 500)
    return () => {
      clearTimeout(timer);
    }
  }




  const [inputVal, setInputVal] = useState({
    title: '',
    comment: ''
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputVal(prev => (
      { ...prev, [name]: value }
    ))

  }

  const addItem = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post('https://61035aa679ed6800174824b1.mockapi.io/articles', {
      title: inputVal.title,
      comment: inputVal.comment
    });

    setInputVal({
      title: '',
      comment: ''
    });
    if (response.status === 201) {
      getData();

    }
  }





  return (
    <div>
      {isLoading && !error && <h2>Loading please wait....</h2>}


      <button
        type="button" className="btn-warning me-2 px-4 ms-3 mb-2 mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add an Article
      </button>
      {/* @ts-ignore tabIndex */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">customize data</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >

                <label htmlFor="title" className="form-label">Title</label>
                <input

                  required
                  onChange={handleChange}
                  value={inputVal.title}
                  name="title"
                  type="text"
                  className="form-control" />

                <label
                  className="mb-3"
                  htmlFor="comment">Description</label>
                <input

                  onChange={handleChange}
                  value={inputVal.comment}
                  name="comment"
                  type="text"
                  className="form-control" />

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={addItem}
                data-bs-dismiss="modal"
                type="button" className="btn btn-primary btn1">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {!isLoading && !error && <Detail data={data} getData={getData} />}
      {error && <h3>{error}</h3>}
    </div>
  )
}

export default Home
