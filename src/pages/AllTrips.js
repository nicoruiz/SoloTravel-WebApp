import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TripCard from "../components/TripCard";
import { Container, Typography } from "@mui/material";

const DUMMY_DATA = [
  {
    id: 1,
    title: "Una escapada de aventura en San Carlos de Bariloche",
    description: "Encontrá en San Carlos de Bariloche una invitación a vivir una experiencia llena de adrenalina en un lugar maravilloso. Sus paisajes y recorridos hacia sus rincones mágicos, no van a dejar de sorprenderte. ¡Una dosis de adrenalina es todo lo que necesitás!",
    image: "https://media.staticontent.com/media/pictures/0a834808-256d-4047-8437-3dc3145fa761/1120x700?op=TRUNCATE&enlarge=false&gravity=sm&quality=80&dpr=1",
    location: "San Carlos de Bariloche, Río Negro",
    price: "44.567"
  },
  {
    id: 2,
    title: "Mendoza, más cerca de las nubes",
    description: "Mendoza te espera para disfrutar de unos días de desconexión, en contacto con la naturaleza. Vas a descubrir el escenario perfecto para vivir una pausa bajo el encanto de sus paisajes mágicos. ¡Escapate de la rutina y contagiate de la energía de este lugar!",
    image: "https://media.staticontent.com/media/pictures/7481aad6-e32c-4535-892c-c0329d183997/1120x700?op=TRUNCATE&enlarge=false&gravity=sm&quality=80&dpr=1",
    location: "Mendoza, Mendoza",
    price: "29.856"
  },
  {
    id: 3,
    title: "Salta: una aventura única",
    description: "Sumergite en los paisajes de Salta y dejá que la adrenalina sea parte de tu viaje. Paisajes, naturaleza y aire puro, resultan una combinación genial hacia la aventura, que sin dudas vas a disfrutar. Escapate, ¡es todo lo que necesitás para olvidarte de la rutina!",
    image: "https://media.staticontent.com/media/pictures/24b82819-e65c-40b1-bde8-aac28c81ef4e/1120x700?op=TRUNCATE&enlarge=false&gravity=sm&quality=80&dpr=1",
    location: "Salta, Salta",
    price: "24.230"
  },
  {
    id: 4,
    title: "Escapate a Ushuaia, te esperan nuevos desafíos",
    description: "Salí al encuentro de la naturaleza y animate a vivir nuevos desafíos en Ushuaia. Descubrí nuevos paisajes, disfrutá del aire puro y sentí la adrenalina, en una experiencia única. Escapate y disfrutá de una dosis de adrenalina, lejos de la rutina.",
    image: "https://media.staticontent.com/media/pictures/f848b417-6e06-4b1f-b88d-1f54e5c4a952/1120x700?op=TRUNCATE&enlarge=false&gravity=sm&quality=80&dpr=1",
    location: "Ushuaia, Tierra del Fuego",
    price: "55.475"
  },
  {
    id: 5,
    title: "Carlos Paz, La Cumbrecita y General Belgrano: sierras cordobesas",
    description: "Escapate a Carlos Paz, disfrutá de un hotel en la Villa y aprovechá de una excursión hacia dos destinos en las Sierras: La Cumbrecita y Villa General Belgrano, donde vas a encontrar un verdadero pasaje a la desconexión. En La Cumbrecita, vas a disfrutar de un pueblo peatonal, con construcciones alpinas que usan energías renovables en medio de bosques, senderos, ríos y cascadas. En Villa General Belgrano, podrás saborear las mejores cervezas artesanales. ¡Córdoba tiene todo para tu próxima escapada!",
    image: "https://media.staticontent.com/media/pictures/5904f9da-e357-44f0-a412-445f5801786e/1120x700?op=TRUNCATE&enlarge=false&gravity=sm&quality=80&dpr=1",
    location: "Villa Carlos Paz, Córdoba",
    price: "31.125"
  },
  {
    id: 6,
    title: "Escapate a Iguazú y descubrí las Cataratas desde Argentina y Brasil",
    description: "Vibrá al ritmo de las Cataratas, conectate con la naturaleza y conocé lugares de los que te vas a enamorar. Tendrás en tu escapada dos días de excursiones, donde podrás conocer las Cataratas desde Argentina. Dejate llevar por el hechizo de la tierra misionera donde la vegetación, los saltos de agua y la fauna autóctona te hacen olvidar la rutina. Aprovechá al máximo cada día y sumergite en las maravillas de esta región. Esta es tu oportunidad para descubrir un lugar único en el mundo. ¡No lo pienses más!",
    image: "https://media.staticontent.com/media/pictures/6968b9b2-1982-4e6d-9a47-61b7a41c3cdb/1120x700?op=TRUNCATE&enlarge=false&gravity=sm&quality=80&dpr=1",
    location: "Puerto Iguazú, Misiones",
    price: "32.756"
  },
  {
    id: 7,
    title: "Navegá por la costa y disfrutá de la ciudad",
    description: "Elegí Mar del Plata y vas a vivir unos días únicos! Sentí la bruma del mar, tu hotel será el punto de partida para cada experiencia: caminar por la playa o saborear la gastronomía local. ¡Regalate en Mar del Plata esos días de desconexión que te prometiste!",
    image: "https://media.staticontent.com/media/pictures/e494c210-5c01-4c22-b3dd-633618a0fbab/1120x700?op=TRUNCATE&enlarge=false&gravity=sm&quality=80&dpr=1",
    location: "Mar del Plata, Buenos Aires",
    price: "12.980"
  }
]

function AllTrips() {
  return (
    <div>
      <Box sx={{ pt: 8, pb: 6 }}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Viajes disponibles
          </Typography>
        </Container>
      </Box>
      <Container sx={{ pb: 20 }}>
        <Grid container spacing={4}>
          {DUMMY_DATA.map((trip) => (
            <Grid item key={trip.id} xs={12} sm={6} md={4}>
              <TripCard
                title={trip.title}
                description={trip.description}
                image={trip.image}
                location={trip.location}
                price={trip.price}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AllTrips;
