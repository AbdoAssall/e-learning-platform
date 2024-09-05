/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Logo from "../assets/images/seff_logo.webp"
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Navbar = () => {

  return (
        <nav className="navbar navbar-expand-lg ps-0">
          <div className="container-fluid">
            <a className="navbar-brand" style={{ flex: 1 }}>
              <div className="logo">
                <Helmet>
                <link rel="preload" as="image" href={Logo} type="image/webp" />
                </Helmet>
                <img src={Logo} alt="Logo" />
              </div>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-between">
                <li className="nav-item">
                  <a className="nav-link link-light active" aria-current="page">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-light">About</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link link-light dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Tech
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item">Action</a></li>
                    <li><a className="dropdown-item">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link-light" to={"/addexam"}>AddExam</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link-light" to={"/online-exam"}>OnlineExam</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link-light" to={"/exam-result"}>ExamResult</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link-light" to={"/exams"}>Exams</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-light">Apps</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-light">Courses</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link link-light dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Jobs
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item">Action</a></li>
                    <li><a className="dropdown-item">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item">Something else here</a></li>
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