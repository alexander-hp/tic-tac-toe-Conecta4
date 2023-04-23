<?php
    if( !empty($_POST) )
    {
      if( isset($_POST['player']) && isset($_POST['valorActualizar']) && isset($_POST['playerAfect'])) 
        {
          // print($_POST);
          $servidor = "localhost";
          $username = "root";
          $password = "";
          $dbname = "conecta4php";
          $player = $_POST['player'];
          $playerAfect = $_POST['playerAfect'];
          $valorActualizar = $_POST['valorActualizar'];
          // echo("'".$player."' '".$valorActualizar."' <br>");

          $conexion = mysqli_connect ($servidor, $username, $password, $dbname) 
              or die ("No se puede conectar con el servidor");

          try {
            switch ($valorActualizar) {
              case 'win':
                // echo("win <br>");
                $queryUpdate = "UPDATE jugador set 
                               JuegosGanados = JuegosGanados + 1
                                WHERE NombreJugador = '".$player."'; \n";
                $queryUpdate1 = "UPDATE jugador set 
                                JuegosPerdidos = JuegosPerdidos + 1
                                WHERE NombreJugador = '".$playerAfect."';";
                break;

              case 'lose':
                // print("lose <br>");
                $queryUpdate1 = "UPDATE jugador set 
                                JuegosPerdidos = JuegosPerdidos + 1
                                WHERE NombreJugador = '".$player."';";  
                $queryUpdate = "UPDATE jugador set 
                               JuegosGanados = JuegosGanados + 1
                                WHERE NombreJugador = '".$playerAfect."'; \n";
                break;

              case 'empty':
                // print("empty <br>");
                $queryUpdate1 = "UPDATE jugador set 
                                JuegosEmpatados = JuegosEmpatados + 1
                                WHERE NombreJugador = '".$player."';";  
                $queryUpdate = "UPDATE jugador set 
                               JuegosEmpatados = JuegosEmpatados + 1
                                WHERE NombreJugador = '".$playerAfect."'; \n";
                break;

              default:
                print("No se paso un parametro");
                break;
            }
            // $queryAddUser = "UPDATE jugador set JuegosGanados = 1, JuegosPerdidos = 2, JuegosEmpatados = 3 WHERE NombreJugador = '".$nombreJugador."' ";
            echo($queryUpdate . "<br>" . $queryUpdate1 );
            $statement = mysqli_query($conexion, $queryUpdate)
                          or die(mysqli_error($conexion));
            $statement = mysqli_query($conexion, $queryUpdate1)
                          or die(mysqli_error($conexion));
          } catch (Exception $e) {
              echo 'Excepcion capturada: ', $e ->getMessage(), "\n";
          }
            
        }
        else
        {
            echo "Introduzca todos los datos requeridos";
        }
        echo "<hr/>";
    }
    else{
        echo "formulario no recibido!!";
    }
 ?>