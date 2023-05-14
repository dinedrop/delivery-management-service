#!/bin/bash

# rename files
for file in user.*
do
  mv "$file" "${file/user/rider}"
done

# replace 'user' with 'rider' and 'User' with 'Rider' in each file
for file in rider.*
do
  sed -i 's/user/rider/g; s/User/Rider/g' "$file"
done
