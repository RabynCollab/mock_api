import { Card, Input } from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { DataModel, Datas } from './models';
import { EditFilled, DeleteFilled } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal';


const Detail = ({ data, getData }: Datas) => {

  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [datIndex, setdatIndex] = useState(0);

  const [inputVal1, setInputVal1] = useState({
    title: '',
    comment: ''
  } as DataModel);


  const getDataByIndex = (id: string | number) => {
    if (id === '1' || id === '2') {
      return;
    } else {
      const dat = data.find((item) => item.id === id);

      setInputVal1({
        title: dat?.title,
        comment: dat?.comment,
        id: dat?.id
      } as DataModel)
      setShowModal(true);
    }

  }


  const removeItem = async (id: string | undefined, num: number) => {


    if (id === '1' || id === '2') {
      return;
    } else {
      setdatIndex(num);
      setLoading(true);
      const response = await axios.delete(`https://61035aa679ed6800174824b1.mockapi.io/articles/${id}`);
      if (response.status === 200) {
        getData();
        setLoading(false);
      }
    }




  }


  const handleChange1 = (e: any) => {
    const { name, value } = e.target;
    setInputVal1(prev => (
      { ...prev, [name]: value }
    ))

  }

  const updateItem = async (e: FormEvent, id: string) => {
    if (id === '1' || id === '2') {
      return;
    } else {

      e.preventDefault();
      setShowModal(false);
      const numId = parseInt(id);


      const response = await axios(`https://61035aa679ed6800174824b1.mockapi.io/articles/${numId}`, {
        method: 'PUT',
        data: {
          title: inputVal1.title,
          comment: inputVal1.comment
        },
      });

      if (response.status === 200) {

        getData();
      }

    }

  }



  return (
    <div className="row">

      {data.map((dat, index) => {

        return <div className="col-lg-4" key={dat.id}>
          <div className="card m-3  "  >

            {loading === true && datIndex === index ? <Card>
              <Meta
                title='Reomoving item'
                description='Pleasw wait'

              /> </Card> : <Card
                cover={
                  <img
                    alt="example"
                    src={`https://source.unsplash.com/random/${dat.num}`} height="220px" width="200px" style={{ objectFit: 'cover' }}
                  />
                }

                actions={[
                  <EditFilled
                    onClick={() => getDataByIndex(dat.id)}
                    style={{ color: 'green' }}
                    key="edit" />,
                  <DeleteFilled

                    onClick={() => removeItem(dat.id, index)}
                    key="remove"
                    style={{ color: "red" }}
                  />,

                ]}
              >

              <Meta
                title={dat.title}
                description={dat.comment}

              />
            </Card>}

            <Modal title="Update Some" visible={showModal} onOk={(e) => updateItem(e, inputVal1.id)} onCancel={() => setShowModal(false)}>
              <form >
                <label htmlFor="title" className="form-label">Title</label>
                <Input
                  required
                  onChange={handleChange1}
                  value={inputVal1.title}
                  name="title"
                  type="text"
                  className="form-control" />

                <label
                  className="mt-3 mb-2"
                  htmlFor="comment">Description</label>
                <Input
                  onChange={handleChange1}
                  value={inputVal1.comment}
                  name="comment"
                  type="text"
                  className="form-control" />
              </form>

            </Modal>

          </div>

        </div>
      })}

    </div>
  )
}

export default Detail
