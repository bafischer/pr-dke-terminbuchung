Um diese Applikation lokal laufen lassen zu können, wird folgende Software benötigt:
1)	Java (Laufzeitumgebung)
2)	Gradle (ein auf JAVA basierendes Management-Automatisierungs-Tool)
3)	Node JS (JavaScript-Laufzeitumgebung)
4)	IntelliJ IDEA (integrierte Entwicklungsumgebung für die Programmiersprache Java)
5)	Docker Desktop (graphische Benutzeroberfläche für das Management von Docker-Komponenten und Docker-Funktionen; in dem konkreten Fall läuft die Datenbank via Docker)
6)	Shell (zB Windows PowerShell, um die Inhalte der Datenbank einsehen zu können)
7)	Browser (für die Darstellung des Front-End’s der Applikation)


Um diese Applikation lokal aufzusetzen, sind folgende Installationsschritte notwendig:
1)	Dieses GitHub-Repository ist zunächst zu clonen. Dafür wird in IntelliJ IDEA die Funktion File-New-Project from Version Control aufgerufen und die folgende URL eingegeben.
https://github.com/bafischer/pr-dke-terminbuchung.git

2)	Anschließend ist ein Shell-Fenster zu öffnen und im Projektverzeichnis stehend, der Befehl: docker-compose up -d auszuführen. Mit diesem Befehl wird ein Docker-Container erstellt, der nach erfolgreicher Ausführung nunmehr mit Status: Running im Docker Desktop ersichtlich sein sollte. Achtung: bevor dieser Befehl ausgeführt wird, bitte unbedingt prüfen, dass der Port 3307 am lokalen Rechner nicht bereits in Verwendung ist. 

3)	Sicherstellen, dass alle notwendigen Gradle-Build-Schritte im IntelliJ-Projekt ausgeführt wurden. Anschließend die SprintBootApplication und somit das Backend starten.

4)	Um das Frontend starten zu können, muss im Verzeichnis stehend indem die package.json-Datei abgelegt ist, der Befehl ng serve zB via shell ausgeführt werden. Für die Anzeige des Frontends der Applikation ist in der Adresszeile des Browsers Folgendes einzugeben: http://localhost:4200.

5)	Damit die Applikation (inkl. frontend) problemlos laufen kann, werden Schnittstellen und Daten von 3 weiteren Applikationen benötigt. 
Das sind die Links zu diesen 3 Applikationen, die im Vorfeld (das backend) zu starten sind:
  - Contact-Tracing: https://github.com/manuelwiltz/pr-dke-contact-tracing
  - Standort- und Impfstoff- sowie Medikamentenverwaltung: https://github.com/Abi646/pr-dke-vaccine-drug-location-administration
  - Terminverwaltung: https://github.com/SeimeU/appointmentManagement
