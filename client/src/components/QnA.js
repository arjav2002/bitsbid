import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Accordion, Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const { REACT_APP_SERVER_IP, REACT_APP_PORT } = process.env

const QnA = ({ itemid, sellerId, qna }) => {
  
  const navigate = useNavigate()
  const regex = /^\s*$/

  const [ques, setQues] = useState("")
  const [ans, setAns] = useState({quest:"", answ:""})
  const [showQues, setShowQues] = useState(false)
  const [showAns, setShowAns] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const [currUser, setCurrUser] = useState("")

  const handleClose = () => {
    setShowQues(false)
    setShowAns(false)
  }

  const handleShowQues = () => setShowQues(true);

  const handleShowAns = (q, a) => {
    setAns({quest: q, answ: a})
    setShowAns(true)
  }

  const handleChangeQues = e => setQues(e.target.value)

  const handleChangeAns = e => setAns({...ans, answ: e.target.value})

  const fetchUrl = 'http://' + REACT_APP_SERVER_IP + ':' + REACT_APP_PORT + `/currentUser`
  axios.get(fetchUrl)
  .then(res => setCurrUser(res.data))
  .catch(err => console.log(err))
    
  let isSeller = false
  if(currUser === sellerId){
    isSeller = true
  }

  const handleSubmitQues = () => {
    if(ques.match(regex) != null){
      setIsEmpty(true)
      return
    }
    setIsEmpty(false)
    const fetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + "/postQuestion"
    axios.post(fetchUrl, null, {params: {
      id: itemid,
      ques: ques
    }})
    .then(res => {
      setShowQues(false)
      navigate(0)
    })
    .catch(err => console.log(err))
  }

  const handleSubmitAns = () => {
    const fetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + "/postAnswer"
    axios.post(fetchUrl, null, {params: {
      id: itemid,
      ques: ans.quest,
      ans: ans.answ
    }})
    .then(res => {
      setShowAns(false)
      navigate(0)
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <div className="container mt-5 mb-3">
        <div className='row'>
          <div className='col h3'>QnA</div>
          <div className='col' style={{ flex: 0 }}>
            <button className="btn btn-danger text-nowrap" disabled={isSeller} onClick={handleShowQues}>Ask a Question</button>
          </div>
        </div>
      </div>

      {/* Modal for posting questions */}
      <Modal show={showQues} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ask a Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Question</Form.Label>
              <Form.Control as="textarea" rows={3} required="required" value={ques} onChange={handleChangeQues}/>
              <div className={"text-danger mt-2 "+(isEmpty?"":"d-none")}> Question can not be empty!</div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmitQues}>Submit Question</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for answering/editing */}
      <Modal show={showAns} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Answer</Form.Label>
              <Form.Control as="textarea" rows={3} required value={ans.answ} onChange={handleChangeAns}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmitAns}>Submit Answer</Button>
        </Modal.Footer>
      </Modal>

      <div className='mb-5'>
        {qna.map(x => {
          return (
            <div className='container mt-3'>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{x.questionText}</Accordion.Header>
                  <Accordion.Body>
                    <div className='text-muted mb-2'>{x.answerText?x.answerText:"No answer yet!"}</div>
                    <button className={"btn btn-success mt-2 "+(isSeller?"":"d-none")} onClick={() => handleShowAns(x.questionText, x.answerText)}>{x.answerText ? "Edit" : "Answer"}</button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          )
        })}
      </div>

      
    </>
  )
}

export default QnA