/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Logo from "../assets/images/seff_logo.png"
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
     
        <nav className="navbar navbar-expand-lg ps-0">
          <div className="container-fluid">
            <a className="navbar-brand" href="#" style={{ flex: 1 }}>
              <div className="logo">
                <img src={Logo} alt="Logo" />
              </div>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-between">
                <li className="nav-item">
                  <a className="nav-link link-light active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-light" href="#">About</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link link-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Tech
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link-light" to={"/add/exam"}>AddExam</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link-light" to={"/online/exam"}>OnlineExam</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link-light" to={"/exam/result"}>ExamResult</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-light">Medical</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-light">Apps</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-light">Courses</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link link-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Jobs
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="btn link-light py-x px-3 border-1 border-warning">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
     
  );
};
export default Navbar;