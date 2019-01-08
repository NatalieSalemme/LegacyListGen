#!/bin/bash
rm -r ../ListGen-Staging/ListGen/*.html;
rm -r ../ListGen-Staging/ListGen/css;
rm -r ../ListGen-Staging/ListGen/js;
rm -r ../ListGen-Staging/ListGen/images;
cp -r app/*.html ../ListGen-Staging/ListGen;
cp -r app/css ../ListGen-Staging/ListGen;
cp -r app/js ../ListGen-Staging/ListGen;
cp -r app/images ../ListGen-Staging/ListGen;
cd ../ListGen-Staging/ListGen/;
