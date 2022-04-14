import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Accordion, Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import "./QnA.css"

const { REACT_APP_SERVER_IP, REACT_APP_PORT } = process.env

const QnA = ({ itemid, sellerId, qna }) => {

  const navigate = useNavigate()
  const regex = /^\s*$/

  const [ques, setQues] = useState("")
  const [ans, setAns] = useState({ quesId: "", answ: "" })
  const [showQues, setShowQues] = useState(false)
  const [showAns, setShowAns] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [currUser, setCurrUser] = useState("")
  const [quesId, setQuesId] = useState("")

  const handleClose = () => {
    setShowQues(false)
    setShowAns(false)
    setShowMessage(false)
  }

  const handleShowAns = (q, a) => {
    setAns({ quesId: q, answ: a })
    setShowAns(true)
  }

  const fetchUrl = 'http://' + REACT_APP_SERVER_IP + ':' + REACT_APP_PORT + `/currentUser`
  axios.get(fetchUrl)
    .then(res => setCurrUser(res.data))
    .catch(err => console.log(err))

  let isSeller = false
  if (currUser === sellerId) {
    isSeller = true
  }

  const handleSubmitQues = () => {
    if (ques.match(regex) != null) {
      setIsEmpty(true)
      return
    }
    setIsEmpty(false)
    const fetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + "/postQuestion"
    axios.post(fetchUrl, null, {
      params: {
        id: itemid,
        ques: ques
      }
    })
      .then(res => {
        setShowQues(false)
        navigate(0)
      })
      .catch(err => console.log(err))
  }

  const handleSubmitAns = () => {
    const fetchUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + "/postAnswer"
    axios.post(fetchUrl, null, {
      params: {
        id: itemid,
        quesId: ans.quesId,
        ans: ans.answ
      }
    })
      .then(res => {
        setShowAns(false)
        navigate(0)
      })
      .catch(err => console.log(err))
  }

  const handleDelete = () => {
    const deleteUrl = "http://" + REACT_APP_SERVER_IP + ":" + REACT_APP_PORT + "/deleteQues"
    axios.delete(deleteUrl, {
      data: {
        id: itemid,
        quesId: quesId
      }
    })
      .then(res => navigate(0))
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="container mt-5 mb-4">
        <div className='row justify-content-center'>
          <div className='col-9 h3'>
            QnA
            <button className="btn btn-danger text-nowrap pull-right" disabled={isSeller} onClick={() => setShowQues(true)}>Ask a Question</button>
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
              <Form.Control as="textarea" rows={3} required="required" value={ques} onChange={(e) => setQues(e.target.value)} />
              <div className={"text-danger mt-2 " + (isEmpty ? "" : "d-none")}> Question can not be empty!</div>
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
              <Form.Control as="textarea" rows={3} required value={ans.answ} onChange={(e) => setAns({ ...ans, answ: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmitAns}>Submit Answer</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for showing messages */}
      <Modal show={showMessage} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete the question?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <div className='mb-5'>
        {qna.map(x => {
          return (
            <div className='container mt-3'>
              <div className="row justify-content-center align-items-center">
                <div className={currUser === x.userId ? "col-8" : "col-9"}>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{x.questionText}</Accordion.Header>
                      <Accordion.Body>
                        <div className='text-muted mb-2'>{x.answerText ? x.answerText : "No answer yet!"}</div>
                        <button className={"btn btn-success mt-2 " + (isSeller ? "" : "d-none")} onClick={() => handleShowAns(x._id, x.answerText)}>{x.answerText ? "Edit" : "Answer"}</button>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                <div className={currUser === x.userId ? "col-1" : "d-none"}>
                  <button className={"delete-button btn"} onClick={() => { setQuesId(x._id); setShowMessage(true);}} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default QnA