import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import Services from '../pages/Services'
import Consultation from "../pages/Consultation"
import Projectmngmt from "../pages/consultation/Projectmngmt"
import Turnkeymgmt from '../pages/consultation/T-automation'
import LifecycleManagement from '../pages/consultation/Lifecycle'
import ProjectPlanning from '../pages/consultation/Projectplan'
import BespokeShowReview from '../pages/consultation/BespokeShowReview'
import ServiceDetail from '../pages/services/ServiceDetail'
import { SERVICES } from '../../cms/servicesRegistry'

function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            {SERVICES.map((service) => (
              <Route
                key={service.id}
                path={service.path}
                element={<ServiceDetail serviceId={service.id} />}
              />
            ))}
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
            <Route path="/services" element={<Services/>}/>
            <Route path="/products" element={<Navigate to="/services" replace />} />
            <Route path="/consultation" element={<Consultation/>}/>
            <Route path="/project-management" element={<Projectmngmt/>}/>
            <Route path="/turnkey-automation" element={<Turnkeymgmt/>}/>
            <Route path='/lifecycle-management' element={<LifecycleManagement/>}/>
            <Route path='/project-planning' element={<ProjectPlanning/>}/>
            <Route path="/bespoke-show-review-models" element={<BespokeShowReview />} />
        </Routes>
    )
}

export default Routers
