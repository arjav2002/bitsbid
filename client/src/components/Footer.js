import React from 'react'

const Footer = () => {
  return (
    <div className="container-fluid mb-0 bg-dark position-absolute" style={{height:100}}>
      <footer className="py-3 my-4">
        <p className="text-center h5 text-muted">Made with &nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg>
          &nbsp; by Arjav, Aayush, Yash, Nayan & Ayush
        </p>
      </footer>
    </div>
  )
}

export default Footer