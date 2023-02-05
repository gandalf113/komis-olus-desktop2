# CLOTHING STORE MANAGER
<p>The program was created for a clothing consignment store, allowing management of the database with customers, contracts, and sales.</p>
<img src="/preview.png" alt="preview">

## Database
The program uses SQLlite3 database.
### Location
Currently, the database is automatically loaded from the location: <i>C:/KOMIS_OLUS/database.sqlite</i>. In the future, the option to manually select the database will be added.
### Structure

#### Clients
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAME</th>
<th>TYPE</th>
<th>DESC</th>
<th>FOREIGN_KEY</th>
</tr>
<tr>
<td>id_klienta</td>
<td>INTEGER</td>
<td>primary key</td>
<td></td>
</tr>
<tr>
<td>skrot</td>
<td>TEXT</td>
<td>it is created from the first two letters of the first name and last name and an ordinal number, e.g. mona2</td>
<td></td>
</tr>
<tr>
<td>imie</td>
<td>TEXT</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>nazwisko</td>
<td>TEXT</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>adres</td>
<td>TEXT</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>nr_tel</td>
<td>TEXT</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

#### Items
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAME</th>
<th>TYPE</th>
<th>DESC</th>
<th>FOREIGN_KEY</th>
</tr>
<tr>
<td>id_przedmiotu</td>
<td>INTEGER</td>
<td>primary key</td>
<td></td>
</tr>
<tr>
<td>id_umowy</td>
<td>INTEGER</td>
<td>id of the contract to which the item belongs</td>
<td>umowy.id_umowy</td>
</tr>
<tr>
<td>nazwa</td>
<td>TEXT</td>
<td>name of the item, e.g. great sweater</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>przyjetaIlosc</td>
<td>INTEGER</td>
<td>quantity of items at the time of acceptance into the consignment</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>sprzedanaIlosc</td>
<td>INTEGER</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>zwroconaIlosc</td>
<td>INTEGER</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>kwotaDlaKomitenta</td>
<td>NUMERIC</td>
<td>amount the consignee will earn.</td>
<td>&nbsp;</td>
</tr>

<tr>
<td>domyslnaMarza</td>
<td>NUMERIC</td>
<td>margin can be changed at the moment of sale</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

#### Sales
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAME</th>
<th>TYPE</th>
<th>DESC</th>
<th>FOREIGN_KEY</th>
</tr>
<tr>
<td>id_sprzedazy</td>
<td>INTEGER</td>
<td>primary key</td>
<td></td>
</tr>
<tr>
<td>id_przedmiotu</td>
<td>INTEGER</td>
<td>id of the sold item</td>
<td>przedmioty.id_przedmiotu</td>
</tr>
<tr>
<td>data</td>
<td>TEXT</td>
<td>date in yyyy-mm-dd format</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>marza</td>
<td>NUMERIC</td>
<td>amount the store will earn</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>cena</td>
<td>NUMERIC</td>
<td>przedmiot.kwotaDlaKomitenta + sprzedaz.marza</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

#### Contracts
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAME</th>
<th>TYPE</th>
<th>DESC</th>
<th>FOREIGN_KEY</th>
</tr>
<tr>
<td>id_umowy</td>
<td>INTEGER</td>
<td>primary key</td>
<td></td>
</tr>
<tr>
<td>id_klienta</td>
<td>INTEGER</td>
<td>id of the customer with whom the contract is signed</td>
<td>klienci.id_klienta</td>
</tr>
<tr>
<td>data</td>
<td>TEXT</td>
<td>date of the contract signing in yyyy-mm-dd format</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>numer_umowy</td>
<td>TEXT</td>
<td>number of the contract, e.g. 6/2022 for the sixth contract of 2022</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>


#### Withdrawals
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAME</th>
<th>TYPE</th>
<th>DESC</th>
<th>FOREIGN_KEY</th>
</tr>
<tr>
<td>id_wyplaty</td>
<td>INTEGER</td>
<td>primary key</td>
<td></td>
</tr>
<tr>
<td>id_klienta</td>
<td>INTEGER</td>
<td>id of the client drawing out the money</td>
<td>klienci.id_klienta</td>
</tr>
<tr>
<td>data</td>
<td>TEXT</td>
<td>withdrawal date in yyyy-mm-dd format</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>kwota</td>
<td>NUMERIC</td>
<td>withdrawed amount</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

#### Returns
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAME</th>
<th>TYPE</th>
<th>DESC</th>
<th>FOREIGN_KEY</th>
</tr>
<tr>
<td>id_zwrotu</td>
<td>INTEGER</td>
<td>primary key</td>
<td></td>
</tr>
<tr>
<td>id_przedmiotu</td>
<td>INTEGER</td>
<td>id of the returned item</td>
<td>przedmioty.id_przedmiotu</td>
</tr>
<tr>
<td>data</td>
<td>TEXT</td>
<td>return date in yyyy-mm-dd format</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>ilosc</td>
<td>INTEGER</td>
<td>amount of the returned items</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
