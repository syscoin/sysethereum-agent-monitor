#!/bin/bash
cd "/home/ubuntu/sysethereum-agents"
syscoind
sleep 5 # wait for stuff to start
java -Dsysethereum.agents.conf.file=/home/ubuntu/sysethereum-agents/data/sysethereum-agents.conf -Dhttps.protocols=TLSv1.2,TLSv1.1,TLSv1 -jar target/sysethereum-agents-1.0-jar-with-dependencies.jar
