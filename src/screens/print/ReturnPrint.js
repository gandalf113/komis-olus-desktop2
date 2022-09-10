import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fullDateToString } from '../../utils/date-utils';
import { decToHex, toCurrency } from '../../utils/miscUtils';
import '../../global.css';
import { setPath } from '../../redux/screenSlice';
import PrintTemplate from './PrintTemplate';

const ReturnPrint = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [_return, setReturn] = useState();

  // const handlePrint = () => {
  //   const hexId = decToHex(id);

  //   try {
  //     window.printer.print(`zwrot_${_return.skrot}_${hexId}_${_return.data}`)
  //   } catch (error) {
  //     alert("Wystąpił błąd podczas drukowania");
  //   }
  // }

  useEffect(() => {
    dispatch(setPath(`Zwroty\\${id}\\Podgląd wydruku`))
    const fetchReturn = async () => {
      window.api.getReturn(id).then(res => {
        setReturn(res[0]);
        console.log(res[0])
      });
    }

    fetchReturn();
  }, [id, dispatch]);

  if (!_return) return null;

  return (
    <PrintTemplate date={_return.data}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80vh', paddingX: 12 }}>
        <Box>
          <Typography sx={{ marginY: 5 }}
            variant='h4'>Pokwitowanie zwrotu towaru przyjętego
            do Komisu dla <i>{_return.imie} {_return.nazwisko}</i></Typography>
          <Typography variant='body1' fontSize={20}><b>Numer umowy:</b> {_return.numer_umowy}</Typography>
          <Typography variant='body1' fontSize={20}><b>Kod przedmiotu:</b> {decToHex(_return.id_przedmiotu)}</Typography>
          <Typography variant='body1' fontSize={20}><b>Nazwa towaru:</b> {_return.nazwa}</Typography>
          <Typography variant='body1' fontSize={20}><b>Zwrócona ilość:</b> {_return.ilosc}</Typography>
          <Typography variant='body1' fontSize={20}><b>Kwota:</b> {toCurrency(_return.kwotaDlaKomitenta)}</Typography>

        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='body1' sx={{ marginBottom: 3 }}>Podpis sprzedawcy: </Typography>
            <Typography variant='body2'>{"...".repeat(20)}</Typography>
          </Box>
          <Box>
            <Typography variant='body1' sx={{ marginBottom: 3 }}>Podpis odbierającego: </Typography>
            <Typography variant='body2'>{"...".repeat(20)}</Typography>
          </Box>
        </Box>

      </Box>
    </PrintTemplate>
  )
}

export default ReturnPrint