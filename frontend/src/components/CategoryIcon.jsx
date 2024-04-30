import React, { useEffect, useState } from 'react'
import { faCar, faCouch, faTv, faBlenderPhone, faShirt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CategoryIcon({ icon, size }) {
  switch (icon) {
    case 'faCar':
      return <FontAwesomeIcon icon={faCar} size={size} />
    case 'faCouch':
      return <FontAwesomeIcon icon={faCouch} size={size} />
    case 'faTV':
      return <FontAwesomeIcon icon={faTv} size={size} />
    case 'faBlenderPhone':
      return <FontAwesomeIcon icon={faBlenderPhone} size={size} />
    case 'faShirt':
      return <FontAwesomeIcon icon={faShirt} size={size} />
    default:
      return null
  }
}

export default CategoryIcon
