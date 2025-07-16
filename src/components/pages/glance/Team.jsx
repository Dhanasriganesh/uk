import React from 'react'
import p1 from "../../../assets/p1.png"
import p2 from "../../../assets/p2.png"
import p3 from "../../../assets/p3.png"
import p4 from "../../../assets/p4.png"
const team = [
  {
    name: 'Richard Aitchison',
    title: 'Technical Sales & Product Manager',
    img: p1,
  },
  {
    name: 'Adrian Gander',
    title: 'Group Managing Director',
    img: p2,
  },
  {
    name: 'Rob Ward',
    title: 'Project Engineering Manager',
    img: p3,
  },
  {
    name: 'Dominic Cust',
    title: 'Projects & Service Manager',
    img: p4,
  },
];

function Team() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">Our Team</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-10">
        Meet the dedicated professionals behind Advanced Tooling Systems UK Ltd. <br />
        Our team brings together years of expertise, innovation, and a passion for delivering exceptional solutions.<br />
        We work collaboratively to ensure the highest standards for our clients worldwide.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((member, idx) => (
          <div key={idx} className="relative rounded-2xl overflow-hidden shadow-lg group bg-gray-100">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-80 object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end min-h-[80px]">
              <h3 className="text-white text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-200 text-sm font-medium">{member.title}</p>
            </div>
          </div>
        ))}
    </div>
    </section>
  )
}

export default Team
