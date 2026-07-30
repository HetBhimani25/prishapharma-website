// Brand color configuration — used across Products table and Catalogues page
export const brandConfig = {
  'Alkem':                { slug: 'alkem',    initial: 'A', badgeClass: 'badge-alkem',    barClass: 'bar-alkem'    },
  'Abbott':               { slug: 'abbott',   initial: 'A', badgeClass: 'badge-abbott',   barClass: 'bar-abbott'   },
  'Cipla':                { slug: 'cipla',    initial: 'C', badgeClass: 'badge-cipla',    barClass: 'bar-cipla'    },
  'Alembic':              { slug: 'alembic',  initial: 'A', badgeClass: 'badge-alembic',  barClass: 'bar-alembic'  },
  "Dr. Reddy's":          { slug: 'drreddy',  initial: 'D', badgeClass: 'badge-drreddy',  barClass: 'bar-drreddy'  },
  'Ajanta Pharma':        { slug: 'ajanta',   initial: 'A', badgeClass: 'badge-ajanta',   barClass: 'bar-ajanta'   },
  'Aristo':               { slug: 'aristo',   initial: 'A', badgeClass: 'badge-aristo',   barClass: 'bar-aristo'   },
  'Lupin':                { slug: 'lupin',    initial: 'L', badgeClass: 'badge-lupin',    barClass: 'bar-lupin'    },
  'Mankind':              { slug: 'mankind',  initial: 'M', badgeClass: 'badge-mankind',  barClass: 'bar-mankind'  },
  'Wallace':              { slug: 'wallace',  initial: 'W', badgeClass: 'badge-wallace',  barClass: 'bar-wallace'  },
  'Hetero Healthcare':    { slug: 'hetero',   initial: 'H', badgeClass: 'badge-hetero',   barClass: 'bar-hetero'   },
  'Healing Pharma':       { slug: 'healing',  initial: 'H', badgeClass: 'badge-healing',  barClass: 'bar-healing'  },
  'Albert David':         { slug: 'albert',   initial: 'A', badgeClass: 'badge-albert',   barClass: 'bar-albert'   },
  'MediTek':              { slug: 'meditek',  initial: 'M', badgeClass: 'badge-meditek',  barClass: 'bar-meditek'  },
  'Prevego':              { slug: 'prevego',  initial: 'P', badgeClass: 'badge-prevego',  barClass: 'bar-prevego'  },
  'Luxica':               { slug: 'luxica',   initial: 'L', badgeClass: 'badge-luxica',   barClass: 'bar-luxica'   },
  'Curetech Skincare':    { slug: 'curetech', initial: 'C', badgeClass: 'badge-curetech', barClass: 'bar-curetech' },
  'German Remedies':      { slug: 'german',   initial: 'G', badgeClass: 'badge-german',   barClass: 'bar-german'   },
  'PIL':                  { slug: 'pil',      initial: 'P', badgeClass: 'badge-pil',      barClass: 'bar-pil'      },
  'SPL':                  { slug: 'spl',      initial: 'S', badgeClass: 'badge-spl',      barClass: 'bar-spl'      },
  'Cadila':               { slug: 'cadila',   initial: 'C', badgeClass: 'badge-cadila',   barClass: 'bar-cadila'   },
  'Intas':                { slug: 'intas',    initial: 'I', badgeClass: 'badge-intas',    barClass: 'bar-intas'    },
  'Troikaa':              { slug: 'troikaa',  initial: 'T', badgeClass: 'badge-troikaa',  barClass: 'bar-troikaa'  },
  'Corona Remedies':      { slug: 'corona',   initial: 'C', badgeClass: 'badge-corona',   barClass: 'bar-corona'   },
  'Otsuka':               { slug: 'otsuka',   initial: 'O', badgeClass: 'badge-otsuka',   barClass: 'bar-otsuka'   },
  'Helios':               { slug: 'helios',   initial: 'H', badgeClass: 'badge-helios',   barClass: 'bar-helios'   },
  'J.B. Chemical':        { slug: 'jbchem',   initial: 'J', badgeClass: 'badge-jbchem',   barClass: 'bar-jbchem'   },
  'Ranbaxy':              { slug: 'ranbaxy',  initial: 'R', badgeClass: 'badge-ranbaxy',  barClass: 'bar-ranbaxy'  },
  'Ranbaxy Nexgen':       { slug: 'ranbaxy-nexgen', initial: 'R', badgeClass: 'badge-ranbaxy-nexgen', barClass: 'bar-ranbaxy-nexgen' },
  'Cipla Vital Care':     { slug: 'cipla-vital',    initial: 'C', badgeClass: 'badge-cipla-vital',    barClass: 'bar-cipla-vital'    },
  'LLSL':                 { slug: 'llsl',           initial: 'L', badgeClass: 'badge-llsl',           barClass: 'bar-llsl'           },
  'APLIFE':               { slug: 'aplife',         initial: 'A', badgeClass: 'badge-aplife',         barClass: 'bar-aplife'         },

};

export const getBrandConfig = (brandName) =>
  brandConfig[brandName] || {
    slug: 'default', initial: brandName?.[0] || '?',
    badgeClass: 'badge-default', barClass: 'bar-default',
  };
