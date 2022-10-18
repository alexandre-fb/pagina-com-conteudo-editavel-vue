export default 
    {
        html: null,
        primaryColor: '#27283f',
        secondaryColor: '#EB4041',
        tertiaryColor: '#cccccc',
        logoImageUrl: 'https://homolog.pinceisatlas.com.br/public/files/69idqhvQF6hy5rGWe9OckElmk8uQz4huPAOup6nX.png',
        bannerSection: {
            image: {
                url: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/banner-image.png?raw=true',
                alt: 'Imagem com produtos Atlas Powertech',
            },
        },
        descriptionSection: {
            title: 'Linha de Máquinas Atlas Powetech',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum rutrum nunc, id faucibus erat ultrices in. In tellus enim, efficitur eu blandit et, tempus vitae justo. Ut a velit orci.',
            button: {
                text: 'Clique aqui e saiba mais',
                link: 'https://www.pinceisatlas.com.br',
            }
        },
        productsListSection: {
            title: 'Conheça nossa linha completa de máquinas',
            productsList: [
                {
            id: 1,
            isOpen: false,
            image: {
                url: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/product-image.png?raw=true',
                alt: 'Imagem do produto'
            },
            productData: {
                name: 'Lixadeira Roto-Orbital',
                code: 'AT1701',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum rutrum nunc, id faucibus erat ultrices in.',
                link: {
                    text: 'Saiba +',
                    url: 'http://www.google.com'
                }
            }
        }
            ],
        },
        selectedSection: '',
    }
