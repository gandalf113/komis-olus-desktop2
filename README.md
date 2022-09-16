# MENADŻER SKLEPU
<p>Program powstał dla komisu odzieżowego, pozwala na zarządzanie bazą danych z klientami, umowami oraz sprzedażą.</p>
<img src="/preview.png" alt="preview">

## BAZA DANYCH
Program korzysta z bazy SQLlite3.
### Lokalizacja
Obecnie baza danych jest automatycznie wczytywana z lokalizacji: <i>C:/KOMIS_OLUS/database.sqlite</i>.
W przyszłości dodana zostanie możliwość ręcznego wyboru bazy danych.
### Struktura

#### Klienci
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAZWA</th>
<th>TYP</th>
<th>OPIS</th>
<th>OBCY_KLUCZ</th>
</tr>
<tr>
<td>id_klienta</td>
<td>INTEGER</td>
<td>klucz główny</td>
<td></td>
</tr>
<tr>
<td>skrot</td>
<td>TEXT</td>
<td>powstaje z dwóch pierwszych liter imienia i nazwiska oraz liczby porządkowej, np. mona2</td>
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

#### Przedmioty
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAZWA</th>
<th>TYP</th>
<th>OPIS</th>
<th>OBCY_KLUCZ</th>
</tr>
<tr>
<td>id_przedmiotu</td>
<td>INTEGER</td>
<td>klucz główny</td>
<td></td>
</tr>
<tr>
<td>id_umowy</td>
<td>INTEGER</td>
<td>id umowy, do której należy przedmiot</td>
<td>umowy.id_umowy</td>
</tr>
<tr>
<td>nazwa</td>
<td>TEXT</td>
<td>nazwa przedmiotu np. zielony sweter</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>przyjetaIlosc</td>
<td>INTEGER</td>
<td>ilość sztuk przedmiotu w momencie przyjęcia do komisu</td>
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
<td>kwota, którą zarobi komitent</td>
<td>&nbsp;</td>
</tr>

<tr>
<td>domyslnaMarza</td>
<td>NUMERIC</td>
<td>marżę można zmienić w momencie sprzedaży</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

#### Sprzedaż
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAZWA</th>
<th>TYP</th>
<th>OPIS</th>
<th>OBCY_KLUCZ</th>
</tr>
<tr>
<td>id_sprzedazy</td>
<td>INTEGER</td>
<td>klucz główny</td>
<td></td>
</tr>
<tr>
<td>id_przedmiotu</td>
<td>INTEGER</td>
<td>id przedmiotu, który się sprzedał</td>
<td>przedmioty.id_przedmiotu</td>
</tr>
<tr>
<td>data</td>
<td>TEXT</td>
<td>data w formacie yyyy-mm-dd</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>marza</td>
<td>NUMERIC</td>
<td>kwota, którą zarobi komis</td>
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

#### Umowy
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAZWA</th>
<th>TYP</th>
<th>OPIS</th>
<th>OBCY_KLUCZ</th>
</tr>
<tr>
<td>id_umowy</td>
<td>INTEGER</td>
<td>klucz główny</td>
<td></td>
</tr>
<tr>
<td>id_klienta</td>
<td>INTEGER</td>
<td>id klienta, z którymy zawarta jest umowa</td>
<td>klienci.id_klienta</td>
</tr>
<tr>
<td>data</td>
<td>TEXT</td>
<td>data zawarcia umowy w formacie yyyy-mm-dd</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>numer_umowy</td>
<td>TEXT</td>
<td>identyfikator, np. 6/2022 dla szóstej umowy w 2022 roku</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>


#### Wyplaty
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAZWA</th>
<th>TYP</th>
<th>OPIS</th>
<th>OBCY_KLUCZ</th>
</tr>
<tr>
<td>id_wyplaty</td>
<td>INTEGER</td>
<td>klucz główny</td>
<td></td>
</tr>
<tr>
<td>id_klienta</td>
<td>INTEGER</td>
<td>id klienta, który wypłaca pieniądze</td>
<td>klienci.id_klienta</td>
</tr>
<tr>
<td>data</td>
<td>TEXT</td>
<td>data wypłaty w formacie yyyy-mm-dd</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>kwota</td>
<td>NUMERIC</td>
<td>wypłacana kwota</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

#### Zwroty
<table style="width: 240px;" border="1" cellpadding="4">
<tbody>
<tr>
<th>NAZWA</th>
<th>TYP</th>
<th>OPIS</th>
<th>OBCY_KLUCZ</th>
</tr>
<tr>
<td>id_zwrotu</td>
<td>INTEGER</td>
<td>klucz główny</td>
<td></td>
</tr>
<tr>
<td>id_przedmiotu</td>
<td>INTEGER</td>
<td>id zwracanego przedmiotu</td>
<td>przedmioty.id_przedmiotu</td>
</tr>
<tr>
<td>data</td>
<td>TEXT</td>
<td>data zwrotu w formacie yyyy-mm-dd</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>ilosc</td>
<td>INTEGER</td>
<td>ilość zwracanych sztuk</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
