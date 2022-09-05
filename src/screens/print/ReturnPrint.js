import { Box, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fullDateToString } from '../../utils/date-utils'
import { toCurrency } from '../../utils/miscUtils'

const ReturnPrint = () => {
  const { id } = useParams();

  const [_return, setReturn] = useState();

  const handlePrint = () => {
    window.printer.print('testeey')
    // const browserWindow = BrowserWindow();
    // const wc = browserWindow.webContents
    // wc.print(options, (success, failureReason) => {
    //   if (!success) console.log(failureReason);

    //   console.log('Print Initiated');
    // });
  }

  useEffect(() => {
    const fetchReturn = async () => {
      window.api.getReturn(id).then(res => {
        setReturn(res[0]);
        console.log(res[0])
      });
    }

    fetchReturn();
  }, [id]);

  if (!_return) return null;

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80vh', paddingX: 12, paddingY: 3 }}>
        <Box onClick={handlePrint}>
          <Button>Drukuj</Button>
          <Typography sx={{ marginBottom: 3 }}
            variant='h4'>Pokwitowanie zwrotu towaru dla <i>{_return.imie} {_return.nazwisko}</i></Typography>
          <Typography variant='body1' fontSize={20}><b>Numer umowy:</b> {_return.numer_umowy}</Typography>
          <Typography variant='body1' fontSize={20}><b>Nazwa towaru:</b> {_return.nazwa}</Typography>
          <Typography variant='body1' fontSize={20}><b>Przyjęta ilość:</b> {_return.przyjetaIlosc}</Typography>
          <Typography variant='body1' fontSize={20}><b>Kwota:</b> {toCurrency(_return.kwotaDlaKomitenta)}</Typography>

        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='body' fontSize={24}>{fullDateToString(_return.data)}</Typography>
          <Box>
            <Typography variant='body1' sx={{ marginBottom: 3 }}>Podpis: </Typography>
            <Typography variant='body2'>___________________________</Typography>
          </Box>
        </Box>

      </Box>
    </div>
  )
}

export default ReturnPrint