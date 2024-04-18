import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";

const DefaultCard = () => {
  return (
    <Card className="w-11/12 shadow-lg m-2 bg-midnight text-white">
      <CardHeader floated={false} className="text-black p-2">
        Venda/Compra
      </CardHeader>
      <CardBody>
        <Typography color="gray">Description</Typography>
      </CardBody>
      <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true} className="bg-white text-black">
          Reserve
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DefaultCard;
