import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Links.scss";
import { ReactComponent as AddToMe } from "../../images/Plus.svg";
import { ReactComponent as ReadMore } from "../../images/ReadMore.svg";

const AllLinks = () => {
  const [links, setLinks] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/links${cat}`);
        setLinks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <>
      <div className="Links">
        {links.map((link) => (
          <div className="Links__card" key={link.id}>
            <img className="Links__img" src={link.img} alt="" />

            <div className="Links__content">
              <Link className="Links__link" to={`/link/${link.id}`}>
                <h1>{link.title}</h1>
              </Link>
              <p>{link.desc}</p>
              <div className="Links__buttons">
                <button>
                  <a
                    href={`https://t.me/${link.original}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ReadMore width="50px" height="50px" />
                  </a>
                </button>
                <p>Жанр: {link.cat}</p>
                <button>
                  <AddToMe width="50px" height="50px" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllLinks;
