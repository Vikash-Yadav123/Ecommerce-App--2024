import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";






const Layout = ({ children, description, keywords, author, title, excludeFromSEO }) => {

  // SEO DEFAULT PROPERTIES DEFINE
  const defaultdescription = "mern stack project";
  const defaultkeyword = "mongodb,express,react,node";
  const defaultauthor = "vikash";
  const defaulttitle = "ecommerce app";

  // SEO PROPERTIES
  const SEOdescription = description || defaultdescription;
  const SEOAuthor = author || defaultauthor;
  const SEOkeyword = keywords || defaultkeyword;
  const SEOtitle = title || defaulttitle;


  return (
    <div>

      <Helmet>

        <meta charSet="UTF-8" />
        <meta name="description" content={SEOdescription} />
        <meta name="keywords" content={SEOkeyword} />
        <meta name="author" content={SEOAuthor} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {excludeFromSEO && <meta name="robots" content="index, follow" />}

        <title>{SEOtitle}</title>


      </Helmet>
      <Header />
      <main>
        {children}
      </main>
      <Toaster />
      <Footer />
    </div>

  )


}



export default Layout;
