import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

export const ItemDetailModal = ({ isOpen, handleClose, item }) => {
    if (!item) return null

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Szczegóły</DialogTitle>
                <DialogContent style={{ mt: 2, minWidth: 560 }}>
                    <p><b>ID:</b> {item.id_przedmiotu}</p>
                    <p><b>Nazwa:</b> {item.nazwa}</p>
                    <p><b>Komitent:</b> {item.imie} {item.nazwisko}</p>
                    <p><b>Skrót:</b> {item.skrot}</p>
                    <p><b>Przyjęta ilość:</b> {item.przyjetaIlosc}</p>
                    <p><b>Sprzedana ilość:</b> {item.sprzedanaIlosc}</p>
                    <p><b>Zwrócona ilość:</b> {item.zwroconaIlosc}</p>
                    <p><b>Ilość w komisie:</b> {parseInt(item.przyjetaIlosc) - parseInt(item.sprzedanaIlosc) - parseInt(item.zwroconaIlosc)}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained'>Zamknij</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ItemDetailModal