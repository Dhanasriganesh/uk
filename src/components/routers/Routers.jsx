import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import About from '../pages/About'
import Capping from "../pages/products/Capping"
import Bespoke from '../pages/products/Bespoke'
import Foodbeverage from '../pages/products/Foodbeverage'
import Bottle from '../pages/products/Bottle'
import Pump from '../pages/products/Pump'
import Turnkey from '../pages/products/Turnkey'
import Ats from '../pages/glance/Ats'
import Team from '../pages/glance/Team'
import News from '../pages/glance/News'
import Partners from '../pages/glance/Partners'
import Sectorr from "../pages/Sectorr"
import Products from '../pages/Products'
import Consultation from "../pages/Consultation"

function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/capping" element={<Capping/>}/>
            <Route path="/bottle" element={<Bottle/>} />
            <Route path="/pump" element={<Pump/>} />
            <Route path="/turnkey" element={<Turnkey/>} />
            <Route path="/bespoke" element={<Bespoke/>} />
            <Route path="/foodbeverage" element={<Foodbeverage/>} />
            <Route path='/ats' element={<Ats/>}/>
            <Route path='/team' element={<Team/>}/>
            <Route path='/partners' element={<Partners/>}/>
            <Route path='/news' element={<News/>}/>
            <Route path="/sectors" element={<Sectorr/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/consultation" element={<Consultation/>}/>
        </Routes>
    )
}

export default Routers
