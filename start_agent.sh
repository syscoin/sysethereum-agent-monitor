#!/bin/bash
cd "/home/ubuntu/sysethereum-agents"
java -Dsysethereum.agents.conf.file=/home/ubuntu/sysethereum-agents/data/sysethereum-agents.conf -Dhttps.protocols=TLSv1.2,TLSv1.1,TLSv1 -jar target/sysethereum-agents-1.0-jar-with-dependencies.jar
