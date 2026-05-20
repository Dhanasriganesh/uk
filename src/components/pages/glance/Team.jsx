import React from 'react'
import { useCmsPage } from '../../../hooks/useCmsPage'
import { CmsImage } from '../../cms/CmsMedia'
import p1 from '../../../assets/p1.png'
import p2 from '../../../assets/p2.png'
import p3 from '../../../assets/p3.png'
import p4 from '../../../assets/p4.png'

const fallbacks = [p1, p2, p3, p4]

function Team() {
  const { content } = useCmsPage('team')
  const members = content.members?.length
    ? content.members
    : [
        { name: 'Richard Aitchison', title: 'Technical Sales' },
        { name: 'Adrian Gander', title: 'Group MD' },
        { name: 'Rob Ward', title: 'Project Engineering' },
        { name: 'Dominic Cust', title: 'Projects & Service' },
      ]

  return (
    <section className="site-container section-py">
      <h1 className="page-title mb-3 text-center font-bold text-blue-800 sm:mb-4">{content.title || 'Our Team'}</h1>
      <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-gray-700 sm:mb-12 sm:text-base lg:text-lg">
        {content.intro || 'Meet the experienced professionals behind ATS Packaging.'}
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
        {members.map((member, idx) => (
          <div key={idx} className="overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl">
            <CmsImage
              src={member.imageUrl}
              fallback={fallbacks[idx]}
              alt={member.name}
              className="aspect-[3/4] w-full object-cover object-top sm:aspect-[4/5]"
            />
            <div className="p-4 text-center sm:p-5">
              <h3 className="text-base font-bold text-gray-900 sm:text-lg">{member.name}</h3>
              <p className="text-sm text-blue-700">{member.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Team
