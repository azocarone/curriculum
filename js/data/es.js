export const cv = {
    contact: {
        name: "José Antonio Azócar Marcano",
        address: {
            location: {
                label: "Ubicación",
                content: "Valencia - Carabobo, Venezuela",
            },
            email: {
                label: "Email",
                content: "email@example.com",
            },
            phone: {
                label: "Teléfono",
                content: "+580123456789",
            },
            website: {
                label: "Website",
                content: "azocar.one",
            },
        },
    },
    sections: {
        summary: {
            id: "summary",
            label: "Resumen profesional",
            content: "Ingeniero en Informática con Máster en Comercio Electrónico, especializado en consultoría y desarrollo de soluciones tecnológicas. Cuenta con amplia experiencia en la gestión de sistemas, seguridad informática y desarrollo de proyectos innovadores. Destaca en la implementación de tecnologías avanzadas y optimización de procesos. Habilidades técnicas en programación y desarrollo web, junto con competencias interpersonales que le permiten liderar equipos hacia el logro de objetivos comunes.",
        },
        experience: {
            id: "experience",
            label: "Experiencia laboral",
            list: [
                {
                    active : true,
                    position: "Asesor IT",
                    dates: {
                        start: "2010-01-01",
                        end: null,
                    },
                    company: "Por Cuenta Propia",
                    location: "Valencia, Venezuela",
                    responsibilities: [
                        "Gestionar y mantener servidores y estaciones de trabajo basadas en sistemas operativos GNU/Linux",
                        "Diseñar y administrar redes LAN",
                        "Implementar medidas de seguridad informática y realizar análisis forense",
                        "Desarrollar proyectos tecnológicos utilizando plataformas como Arduino y Raspberry Pi",
                        "Registrar y administrar dominios de Internet",
                        "Implementar y optimizar servicios de alojamiento web",
                        "Resolver incidentes informáticos de manera eficiente",
                        "Realizar instalaciones eléctricas especializadas",
                    ],
                    url: "https://azocar.one",
                },
                {
                    active : true,
                    position: "Coordinador de Sistemas",
                    dates: {
                        start: "2007-05-01",
                        end: "2009-10-01",
                    },
                    company: "Almacenes y Depósitos Integrales Portuarios, C.A.",
                    location: "Puerto Cabello, Venezuela",
                    responsibilities: [
                        "Cumplir con la normativa aduanera para operaciones de importación y exportación",
                        "Aumentar la eficacia del personal logístico",
                        "Optimizar la exactitud del inventario",
                        "Planificar recursos operativos",
                        "Reducir tiempos de carga y descarga de buques",
                        "Garantizar la seguridad física de la carga",
                        "Ejecutar despachos de manera oportuna",
                    ],
                    url: "https://drive.google.com/file/d/15UP-_bxBGPBW5Z1lkk62BZPf25dZYUtj/view?usp=drive_link",
                },
                {
                    active : true,
                    position: "Pasante de Máster en Comercio Electrónico",
                    dates: {
                        start: "2006-03-01",
                        end: "2006-06-01",
                    },
                    company: "CompuMarket S.A.",
                    location: "Madrid, España",
                    responsibilities: [
                        "Adquirir conocimientos en análisis y gestión de ventas por Internet",
                        "Dominar técnicas de SEO",
                        "Gestionar contenido web",
                        "Analizar la competencia en línea",
                        "Implementar estrategias de Internet marketing",
                        "Cumplir con estándares de calidad y eficiencia",
                    ],
                    url: "https://drive.google.com/file/d/1D9YjClWbaLc8cRyMFn16X6GAAOOnLYcV/view?usp=drive_link",
                },
            ],
        },
        education: [
            {
                id: "academicEducation",
                label: "Formación Académica",
                list: [
                    {
                        active: true,
                        title: "Máster en Comercio Electrónico",
                        institution: 'Universidad "Carlos III de Madrid"',
                        location: "Madrid, España",
                        dates: {
                            start: "2005-10-10",
                            end: "2006-09-10",
                        },
                        url: "https://drive.google.com/file/d/1z5K-iYm4WesIh68qvL_6UazhPAo_be70/view?usp=drive_link",
                    },
                    {
                        active: true,
                        title: "Ingeniería en Informática",
                        institution: 'Universidad "Alejandro de Humboldt"',
                        location: "Caracas, Venezuela",
                        dates: {
                            start: "1999-09-10",
                            end: "2004-06-10",
                        },
                        url: "https://drive.google.com/file/d/1buZX7Al93yzHXyfRpOjB5S86frdihGfi/view?usp=drive_link",
                    },
                    {
                        active: true,
                        title: "Técnico Superior en Computación",
                        institution: 'Instituto Universitario de "Nuevas Profesiones"',
                        location: "Valencia, Venezuela",
                        dates: {
                            start: "1988-09-10",
                            end: "1992-12-10",
                        },
                        url: "https://drive.google.com/file/d/1SQhcfn_ccc34pnOwPwoxXZL1y9HsJqp8/view?usp=drive_link",
                    },
                ],
            },
            {
                id: "continuousTraining",
                label: "Capacitación Continua",
                list: [
                    {
                        active: true,
                        number: "01",
                        title: "Profesional de Python",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-06-01",
                        },
                        url: "https://drive.google.com/file/d/1Bj93CSt9ZhMV1GNDTqqWW415_zYJaKQe/view?usp=drive_link",
                    },
                    {
                        active: false,
                        number: "02",
                        title: "Power BI",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-07-02",
                        },
                        url: "https://drive.google.com/file/d/1qPSzcZJVm8jVIDJ8U8Guwqtjlao-gbyM/view?usp=drive_link",
                    },
                    {
                        active: true,
                        number: "03",
                        title: "Introducción al análisis de datos con Python",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-07-06",
                        },
                        url: "https://drive.google.com/file/d/1gNtnw6OIEcYehHiANXYV3G4JmMPyniGq/view?usp=drive_link",
                    },
                    {
                        active: false,
                        number: "04",
                        title: "Lógica proposicional",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-20",
                        },
                        url: "https://codigofacilito.com/certificates/99167",
                    },
                    {
                        active: false,
                        number: "05",
                        title: "Teoría de conjuntos",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-20",
                        },
                        url: "https://codigofacilito.com/certificates/99292",
                    },
                    {
                        active: false,
                        number: "06",
                        title: "Álgebra lineal",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-21",
                        },
                        url: "https://codigofacilito.com/certificates/100301",
                    },
                    {
                        active: true,
                        number: "07",
                        title: "Álgebra lineal",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-21",
                        },
                        url: "https://drive.google.com/file/d/1btGSX8Z8tNfd3mAOcXyeggJAVv4vJ5tg/view?usp=drive_link",
                    },
                    {
                        active: false,
                        number: "08",
                        title: "Regresión",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-22",
                        },
                        url: "https://drive.google.com/file/d/18GsbtfHT8cFwBRXKsJLtls5B5diyQ-bK/view?usp=drive_link",
                    },
                    {
                        active: false,
                        number: "09",
                        title: "Árboles de decisión",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-22",
                        },
                        url: "https://drive.google.com/file/d/1yESjbzR2ngRliU-FfefUN_Hm96paiRwm/view?usp=drive_link",
                    },
                    {
                        active: true,
                        number: "10",
                        title: "Fundamentos de Estadística I & II",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-22",
                        },
                        url: "https://drive.google.com/file/d/10wx_TF1WzZw2Fi9hQq5M5kusHEqqxiQP/view?usp=drive_link",
                    },
                    {
                        active: false,
                        number: "11",
                        title: "Instalación y configuración de Python",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-23",
                        },
                        url: "https://drive.google.com/file/d/1ZOKry2EcPzqe5tKQ-2Py9BIvxacH83M5/view?usp=drive_link",
                    },
                    {
                        active: false,
                        number: "12",
                        title: "Anotaciones y Type Hints con Python",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-23",
                        },
                        url: "https://drive.google.com/file/d/15owt740I5FqHQ2NFz_WTny7iZwr7sNyY/view?usp=drive_link",
                    },
                    {
                        active: false,
                        number: "13",
                        title: "Profesional de Docker",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-24",
                        },
                        url: "https://drive.google.com/file/d/1_4zikAahcNJJiET_wDgzxaTlj2zid05m/view?usp=drive_link",
                    },
                    {
                        active: false,
                        number: "14",
                        title: "Manejo de archivos con Python",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-25",
                        },
                        url: "https://drive.google.com/file/d/1YU-zjlhyRkS8_K8qgvMDTPop_k9c0oVn/view?usp=drive_link",
                    },
                    {
                        active: false,
                        number: "15",
                        title: "Reto Python",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-03-01",
                        },
                        url: "https://codigofacilito.com/certificates/130476",
                    },
                    {
                        active: false,
                        number: "16",
                        title: "GitHub Copilot",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2023-11-25",
                        },
                        url: "https://drive.google.com/file/d/1fC4B70Ply3HznSfiIrJU4kLmuZDgtoX0/view?usp=drive_link",
                    },
                    {
                        active: true,
                        number: "17",
                        title: "Introducción a Machine Learning",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2024-03-17",
                        },
                        url: "https://drive.google.com/file/d/1dyX-o3kAu-7QKg3VB1K1uiaw-TfJ8gQZ/view?usp=drive_link",
                    },
                    {
                        active: false,
                        number: "18",
                        title: "MLOps",
                        institution: "Código Facilito",
                        location: "Tuxtla Gutiérrez, México",
                        dates: {
                            start: null,
                            end: "2024-03-18",
                        },
                        url: "https://drive.google.com/file/d/1E2dwKzlFoXM1MRHQTcsO77Ggi7jZQKQh/view?usp=drive_link",
                    },
                ],
            },
            {
                id: "certifications",
                label: "Certificaciones",
                list: [
                    {
                        active: true,
                        title: "Programa Oracle Next Education",
                        institution: "Alura Latam",
                        location: "São Paulo, Brasil",
                        dates: {
                            start: "2022-07-27",
                            end: "2023-05-16",
                        },
                        url: "https://app.aluracursos.com/user/azocarone/fullCertificate/4ccff4b5373324134b6783e53c7b6203",
                    },
                ],
            },
        ],
        skills: [
            {
                id: "technical",
                label: "Habilidades técnicas",
                list: [
                    "GNU/Linux",
                    "Redes",
                    "Seguridad informática",
                    "Git",
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Docker",
                    "Raspberry Pi",
                    "Arduino",
                    "VS Code",
                    "GitHub",
                    "Trello",
                    "Discord",
                    "Análisis forense",
                    "SEO",
                    "Fedora Linux",
                ],
            },
            {
                id: "soft",
                label: "Habilidades blandas",
                list: [
                    "Adaptación rápida a nuevas situaciones",
                    "Organización de tareas",
                    "Trabajo en equipo",
                    "Comunicación clara y efectiva",
                    "Liderazgo",
                    "Influencia positiva",
                    "Enfoque en resultados",
                    "Resiliencia",
                ],
            },
            {
                id: "languages",
                label: "Idiomas",
                list: ["Español nativo (C2)", "Inglés básico-intermedio (A1-A2)"],
            },
        ],
    },
    footer: {
        label: "Todos los derechos reservados.",
    },
};