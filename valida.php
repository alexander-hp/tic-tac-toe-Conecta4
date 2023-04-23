<?php
    if( !empty($_POST) )
    {
        if( isset($_POST['player1'])) 
        {
            // print($_POST);
            $servidor = "localhost";
            $username = "root";
            $password = "";
            $dbname = "conecta4php";
            $conexion = mysqli_connect ($servidor, $username, $password, $dbname) 
                or die ("No se puede conectar con el servidor");
            
            // $instruccion = "SELECT * FROM `jugador`";
            // $consulta = mysqli_query($conexion, $instruccion)
            //     or die ("No se puede Realizar operación");
                
            // $nfilas = mysqli_num_rows($consulta);
            // $cad= "La tabla tiene $nfilas filas <br><br>";
            // while($fila = mysqli_fetch_assoc($consulta)){
            //     $cad= $cad." ".$fila["NombreJugador"]."<br>";
            //     $cad= $cad." ".$fila["JuegosGanados"]."<br>";
            //     $cad= $cad." ".$fila["JuegosPerdidos"]."<br>";
            //     $cad= $cad." ".$fila["JuegosEmpatados"]."<br> <br>";
            // }
            // echo $cad;

            // $instruccion = "INSERT INTO `jugador`(`id`, `NombreJugador`, `JuegosGanados`, `JuegosPerdidos`, `JuegosEmpatados`) VALUES (null, '$_POST["player1"]',3,4,5)";
            // print($instruccion);
            // mysqli_query($conexion, $instruccion)
            //     or die("No se pudo agregar al usuario");
            $player = $_POST['player1'];
            $player2 = $_POST['player2'];
            if ($player != $player2) {
                try {
                    // $sql1 =  "INSERT INTO jugador
                    //         (id, NombreJugador, JuegosGanados, JuegosPerdidos, JuegosEmpatados) 
                    //         VALUE (null, '".$player."', 0, 0, 0)";
                    // $qyr = mysqli_query($conexion, $sql1)
                    //     or die(mysqli_error($qyr));

                    $atributo = "NombreJugador";
                    $tabla = "jugador";
                    print_r($_POST);

                    
                    $nombreJugador = $player;
                    for ($i=0; $i < 2; $i++) {
                        $row = 0;
                        $query = "SELECT COUNT(*) FROM $tabla WHERE $atributo = '".$nombreJugador."' ";
    
                        $statement = mysqli_query($conexion, $query)
                            or die(mysqli_error($conexion));
                        // print_r($statement);
                        $row = mysqli_fetch_array($statement);
                        print($row[0]);
                        if ( $row[0] > 0) {
                            echo ("El atributo ya existe en la tabla, no se debe agregar '$nombreJugador'");
                            $queryAddUser = "UPDATE jugador set JuegosGanados = 1, JuegosPerdidos = 2, JuegosEmpatados = 3 WHERE NombreJugador = '".$nombreJugador."' ";


                        } else {
                            // echo ("El atributo no existe en la tabla, se puede agregar");
                            print($player);
                            $queryAddUser = "INSERT INTO jugador VALUES (null, '".$nombreJugador."' , 0,0,0)";
                            print($queryAddUser);
                            mysqli_query($conexion, $queryAddUser)
                                or die(mysqli_error($conexion));
                        }
                        $nombreJugador = $player2;
                    }

                } catch (Exception $e) {
                    echo 'Excepcion capturada: ', $e ->getMessage(), "\n";
                }
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