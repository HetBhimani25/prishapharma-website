// Brand color configuration — used across Products and Catalogues pages
export const brandConfig = {
  'Sun Pharma':     { slug: 'sun-pharma',   initial: 'S', badgeClass: 'badge-sun',     barClass: 'bar-sun'     },
  'Cipla':          { slug: 'cipla',         initial: 'C', badgeClass: 'badge-cipla',   barClass: 'bar-cipla'   },
  'Alkem':          { slug: 'alkem',         initial: 'A', badgeClass: 'badge-alkem',   barClass: 'bar-alkem'   },
  'Torrent Pharma': { slug: 'torrent',       initial: 'T', badgeClass: 'badge-torrent', barClass: 'bar-torrent' },
  'Lupin':          { slug: 'lupin',         initial: 'L', badgeClass: 'badge-lupin',   barClass: 'bar-lupin'   },
  'Abbott India':   { slug: 'abbott',        initial: 'A', badgeClass: 'badge-abbott',  barClass: 'bar-abbott'  },
  'Mankind Pharma': { slug: 'mankind',       initial: 'M', badgeClass: 'badge-mankind', barClass: 'bar-mankind' },
  "Dr. Reddy's":    { slug: 'drreddy',       initial: 'D', badgeClass: 'badge-drreddy', barClass: 'bar-drreddy' },
  'Zydus':          { slug: 'zydus',         initial: 'Z', badgeClass: 'badge-zydus',   barClass: 'bar-zydus'   },
  'Cadila':         { slug: 'cadila',        initial: 'C', badgeClass: 'badge-cadila',  barClass: 'bar-cadila'  },
  'Emcure':         { slug: 'emcure',        initial: 'E', badgeClass: 'badge-emcure',  barClass: 'bar-emcure'  },
  'IPCA':           { slug: 'ipca',          initial: 'I', badgeClass: 'badge-ipca',    barClass: 'bar-ipca'    },
};

export const getBrandConfig = (brandName) =>
  brandConfig[brandName] || { slug: 'default', initial: brandName?.[0] || '?', badgeClass: 'badge-default', barClass: 'bar-default' };
