const path = require( 'path' ); 
const express = require( 'express' );
const hbs = require( 'hbs' );
const geocode = require( './utils/geocode' );
const forecast = require( './utils/forecast' );

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join( __dirname, '../public' );
const viewsPath = path.join( __dirname, '../templates/views' );
const partialsPath = path.join( __dirname, '../templates/partials' );

//setup handlebars engine and views location
app.set( 'view engine', 'hbs' )
app.set( 'views', viewsPath )
hbs.registerPartials( partialsPath );

//Setup static directory to serve
app.use( express.static( publicDirectoryPath ) );

app.get( '', (req, res) => {
    res.render( 'index', {
        title: 'Weather ',
        name: 'Serisha Jain'
    })
} )

app.get( '/about', (req,res) => {
    res.render( 'about', {
        title: 'ABOUT ME:',
        name: 'Serisha Jain'
    } );
} )

app.get( '/help', ( req, res ) => {
    res.render( 'help', {
        title: 'Help page',
        message: 'If you need help, here we are!! Contact our support staff. Conatct details are provided below....',
        name:'Serisha Jain'
    })
})

app.get( '/weather', ( req, res ) => {
    if ( !req.query.address ) {
        return res.send( {
            error:'Please provide the Location.!!'
        })
    }
    
    geocode( req.query.address, ( error, { latitude, longitude, location } ={} ) => {
        if ( error ) {
            return res.send( { error } );
        }

        forecast( latitude, longitude, ( error, forecastData ) => {
            if ( error ) {
                return res.send( { error } );
            }

            res.send( {
                forecast: forecastData,
                location,
                address: req.query.address
            })
        } ) 
    })
} )

app.get( '/products', ( req, res ) => {
    if (!req.query.search) {
        return res.send( {
            error:'You must provide a search term'
        })
    } 
    console.log( req.query.search)
    res.send( {
        products:[]
    })
})


app.get( '/help/*', ( req, res ) => {
    res.render( '404', {
        title: 404,
        name:'Serisha Jain',
        errorMessage: 'Help article not found'
    })
})

app.get( '*', (req,res) => {
    res.render( '404', {
        title: 404,
        name:'Serisha Jain',
        errorMessage: 'Page Not Found'
    })
})

app.listen( 3000, () => {
    console.log( 'Server running on port 3000' );
})