<?php
            // print($_POST);
            $servidor = "localhost";
            $username = "root";
            $password = "";
            $dbname = "conecta4php";
            $conexion = mysqli_connect ($servidor, $username, $password, $dbname) 
                or die ("No se puede conectar con el servidor");
            
            try {
              $row = 0;
              $query = "SELECT *
                        FROM jugador
                          ORDER BY JuegosGanados DESC
                          LIMIT 5";

              $statement = mysqli_query($conexion, $query)
                  or die(mysqli_error($conexion));
              // print_r($statement);

              $nfilas = mysqli_num_rows($statement);
              // $cad= "La tabla tiene $nfilas filas <br><br>";
              $i = 1;
              $cad= '<table><tr><th>Posición</th><th>Nombre</th><th>Puntaje</th></tr>';
              while($fila = mysqli_fetch_assoc($statement)){
                  $cad= $cad." <tr><td>".$i."</td>";
                  $cad= $cad." <td>".$fila["NombreJugador"]."</td>";
                  $cad= $cad." <td>".$fila["JuegosGanados"]."</td> </tr>";
                $i++;
              }
              echo $cad;

              // $row = mysqli_fetch_array($statement);
              // print_r($row);

            } catch (Exception $e) {
                echo 'Excepcion capturada: ', $e ->getMessage(), "\n";
            }

 ?>